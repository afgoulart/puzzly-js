/**
* Copy Packages
*/
const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'packages'), (err, folders) => {
    const allConfigs = {
        packages: {},
        routes: []
    }
    
    if (err) throw err;
    const readfolders = folders.reduce((acc, dir) => {
        if (dir.startsWith('.')) return acc;
        return acc.concat(new Promise((resolve, reject) => {
            const mConfig = require(`./packages/${dir}/config.json`);
            const { route, statics, ...configs } = mConfig;
            allConfigs.packages[dir] = configs;
            allConfigs.routes = allConfigs.routes.concat(route);
            
            if (statics) {
                const filesRefs = statics.reduce((acc, f) => {
                    console.log(f, `js - ${f.endsWith('.js')}`, `css - ${f.endsWith('.css')}`);
                    if (f.endsWith('js')) acc.scripts.push({ path: `/javascripts/${dir}/${f}` });
                    else if (f.endsWith('css')) acc.styles.push({ path: `/javascripts/${dir}/${f}` });
                    console.log(acc);
                    return acc;
                }, {
                    scripts: [],
                    styles: []
                });
                allConfigs.packages[dir] = {
                    ...allConfigs.packages[dir],
                    ...filesRefs
                }
                return resolve()
            }

            fs.mkdir(path.resolve(__dirname, `public/javascripts/${dir}`), (err) => {
                if (err && err.code != 'EEXIST') {
                    return reject(err);
                }

                fs.readdir(path.resolve(__dirname, `packages/${dir}/${configs.publicPath}`), (err, files) => {
                    if (err) return reject(err);
                    const statics = files.reduce((acc, f) => {
                        console.log(f, `.../${dir}/${f}`, `js - ${f.endsWith('.js')}`, `css - ${f.endsWith('.css')}`);
                        if (f.endsWith('js')) acc.scripts.push({ path: `/javascripts/${dir}/${f}` });
                        else if (f.endsWith('css')) acc.styles.push({ path: `/javascripts/${dir}/${f}` });
                        console.log(acc);
                        return acc;
                    }, {
                        scripts: [],
                        styles: []
                    });
                    allConfigs.packages[dir] = {
                        ...allConfigs.packages[dir],
                        ...statics
                    }
                    console.log(allConfigs.packages[dir]);
                    
                    resolve();
                })
            });
        }));
    }, []);
    
    Promise.all(readfolders).then(() => {
        Object.keys(allConfigs.packages).map(dir => {
            ncp.limit = 16;
            ncp(path.resolve(__dirname, `packages/${dir}/dist`), path.resolve(__dirname, `public/javascripts/${dir}`), function (err) {
                if (err) throw err;
                
                console.log(`Move statics from "${dir}" pkg - Ok`)
            });
        });
        
        const json = JSON.stringify(allConfigs);
        fs.writeFile(path.resolve(__dirname + '/settings.json'), json, 'utf8', (err) => {
            if (err) throw err;

            console.log("create settings.json");
        });
    }).catch(err => {
        console.log(err)
    });
});